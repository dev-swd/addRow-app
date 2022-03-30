class Api::V1::TasksController < ApplicationController

  def index
    render json: Task.all.order(:number)
  end

  def create
    #1(NG)
#    tasks = Task.new(task_params)
#    tasks.each do |task|
#      task.save
#    end

    #2
#    Task.create(task_params)

    #1(OK)
#    task_params.map do |task|
#      newtask=Task.new(task)
#      newtask.save
#    end

    #3 レコードがあれば更新、なければ登録
    task_params.map do |task_param|
      task = Task.find_or_initialize_by(id: task_param[:id])
      task.number = task_param[:number]
      task.name = task_param[:name]
      task.target_person = task_param[:target_person]
      task.planned_period_fr = task_param[:planned_period_fr]
      task.planned_period_to = task_param[:planned_period_to]
      task.planned_workload = task_param[:planned_workload]
      task.status = task_param[:status]
      task.save
    end

  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: task
  end

  private
  def task_params
#    params.require(:tasks).permit(:number, :name, :target_person, 
#              :planned_period_fr, :planned_period_to, :planned_workload, 
#              :actual_period_fr, :actual_period_to, :actual_workload, 
#              :status)

#    params.require(:_json).permit(:number, :name, :target_person, 
#      :planned_period_fr, :planned_period_to, :planned_workload, 
#      :actual_period_fr, :actual_period_to, :actual_workload, 
#      :status)
  
    params.require(:_json).map do |task|
      task.permit(:id, :number, :name, :target_person, 
        :planned_period_fr, :planned_period_to, :planned_workload, 
        :actual_period_fr, :actual_period_to, :actual_workload, 
        :status)
    end                        
  end

end
