class Repo < ApplicationRecord
    belongs_to :user
    has_many :runs

    def build
        {
            id: self.id,
            repo_name: self.repo_name,
            clone_url: self.clone_url,
            runs: self.runs.map { |r| r.build }
        }
    end
end
