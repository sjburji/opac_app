class AddFastMovingPlansToPlans < ActiveRecord::Migration
  def self.up
    add_column :plans, :fast_moving_plans, :string
  end

  def self.down
    remove_column :plans, :fast_moving_plans
  end
end
