class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token

    def app
        @user = current_user.build.to_json if current_user
        render :index
    end

    def new_session_path(scope)
        new_user_session_path
    end
end
