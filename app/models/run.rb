class Run < ApplicationRecord
    belongs_to :repo

    def build
        {
            id: self.id,
            uuid: self.uuid,
            branch: 'Master',
            status: self.status,
            commit: self.commit,
            created_at: self.created_at,
            history: self.history
        }
    end

    def update_or_destroy(repo, params)
        if repo.id == self.repo_id
            if self.uuid == params[:uuid]
                if params[:status] === 1
                    ActionCable.server.broadcast "Repo_#{repo_id}", { stream: self.id, status: params[:status], history: params[:ip] }
                    self.update(status: params[:status], history: params[:ip])
                else
                    ActionCable.server.broadcast "Repo_#{repo_id}", { stream: self.id, status: params[:status], history: params[:history].as_json }
                    self.update(status: params[:status], history: params[:history].as_json)
                end
            end
        end
    end

    def self.create_stream(user, repo, url)
        #Generate uid and connect to digital ocean
        uuid = SecureRandom.uuid
        client = DropletKit::Client.new(access_token: user.token_do)

        #Create run record
        run = Run.create!(uuid: uuid, status: 0, repo_id: repo.id)

        #Generate droplet metadata
        @clone_url = repo.clone_url
        @repo_id = repo.id
        @run_id = run.id
        @run_uuid = uuid
        @host = url
        @api_key = user.token_do
        template = ERB.new(File.read('./app/scripts/user_data.sh.erb'))
        #Create droplet
        droplet = DropletKit::Droplet.new(name: "DigiCI-instance-#{uuid}", region: 'nyc3', image: 'ubuntu-16-04-x64', size: 's-1vcpu-1gb', user_data: template.result(binding))
        created = client.droplets.create(droplet)

        run
    end
end
