class Run < ApplicationRecord
    belongs_to :repo

    def build
        {
            id: self.id,
            status: self.status,
            commit: self.commit,
            created_at: self.created_at
        }
    end
end
