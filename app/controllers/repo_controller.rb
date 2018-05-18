class RepoController < ApplicationController
    before_action :authenticate_user!

    def index
        @repos = current_user.repos
        render json: @repos
    end

    def new
        pp params
        @repos = current_user.repos
        render json: {test: 'hi'}
    end

    def delete
        @repos = current_user.repos
        render json: @repos
    end
end