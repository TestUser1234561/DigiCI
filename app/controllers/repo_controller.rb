class RepoController < ApplicationController
    before_action :authenticate_user!

    def index
        @repos = current_user.repos
        @repo_array = []
        @repos.each do |r|
            @repo_array << r.build
        end
        render json: @repo_array
    end

    def new
        @user = current_user
        @repo = Repo.create(repo_params)
        @user.repos << @repo
        render json: @repo.build
    end

    def show
        @user = current_user
        @repo = Repo.find(params[:id])

        if @repo.user_id == @user.id
            render json: @repo
        else
            render json: { errors: 'Repo not found' }
        end
    end

    def delete
        @repos = current_user.repos
        @repos = @repos.map do |r|
            r.build.target!
        end
        render json: @repos
    end

    private
    def repo_params
        params.permit(:clone_url, :repo_name)
    end
end