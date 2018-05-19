class Repo < ApplicationRecord
    belongs_to :user

    def build
        {
            id: self.id,
            repo_name: self.repo_name,
        }
    end
end
