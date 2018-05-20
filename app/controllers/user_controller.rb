class UserController < ApplicationController
    before_action :authenticate_user!

    def update
        @user = current_user
        @user.token_do = params.permit(:token_do)[:token_do]
        @user.save
        render json: { errors: false }
    end

    private
end