class StreamController < ApplicationController
    before_action :authenticate_user!, except: [:update]

    def new
        @user = current_user
        @repo = Repo.find(params[:id])
        #TODO: change url location to request.host_with_port
        @stream = Run.create_stream(@user, @repo, '142.162.58.209:3000') if @repo.user_id == @user.id
        render json: @stream
    end

    def update
        @repo = Repo.find(params[:id])
        @stream = Run.find(params[:stream_id])
        @stream.update_or_destroy @repo, params
    end
end