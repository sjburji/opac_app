class AddRebateCategoryToPlan < ActiveRecord::Migration
  def self.up
    add_column :plans, :rebate_category, :integer
  end

  def self.down
    remove_column :plans, :rebate_category
  end
end
