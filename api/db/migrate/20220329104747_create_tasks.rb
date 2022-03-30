class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string "number"
      t.string "name"
      t.string "target_person"
      t.date "planned_period_fr"
      t.date "planned_period_to"
      t.decimal "planned_workload", precision: 5, scale: 2
      t.date "actual_period_fr"
      t.date "actual_period_to"
      t.decimal "actual_workload", precision: 5, scale: 2
      t.string "status"
      t.timestamps
    end
  end
end
