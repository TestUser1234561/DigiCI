class CreateRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :runs do |t|
      t.integer :repo_id
      t.integer :status
      t.string :uuid
      t.string :branch
      t.string :commit
      t.string :history

      t.timestamps
    end
  end
end
