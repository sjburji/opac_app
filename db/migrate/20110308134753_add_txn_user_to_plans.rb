class AddTxnUserToPlans < ActiveRecord::Migration
  def self.up
    add_column :plans, :created_by, :string
    add_column :plans, :modified_by, :string
  end

  def self.down
    remove_column :plans, :modified_by
    remove_column :plans, :created_by
  end
end
