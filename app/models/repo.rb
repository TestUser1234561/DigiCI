class Repo < ApplicationRecord
    belongs_to :user
    has_many :runs

    def build
        {
            id: self.id,
            name: self.repo_name,
            clone_url: self.clone_url,
            runs: self.runs.order('created_at DESC').map { |r| r.build }
        }
    end
end
