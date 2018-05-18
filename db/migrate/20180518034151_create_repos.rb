class CreateRepos < ActiveRecord::Migration[5.2]
  def change
    create_table :repos do |t|
      t.integer :user_id
      t.string :repo_name
      t.string :clone_url

      t.timestamps
    end
  end
end
