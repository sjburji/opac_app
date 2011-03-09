class CreateRebates < ActiveRecord::Migration
  def self.up
    create_table :rebates do |t|
      t.integer :category
      t.integer :membership_months
      t.integer :rebate_months

      t.timestamps
    end
  end

  def self.down
    drop_table :rebates
  end
end
