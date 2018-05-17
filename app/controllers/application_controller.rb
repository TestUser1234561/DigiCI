class ApplicationController < ActionController::Base
    def app
        @user = current_user.build.target!
        render :index
    end

    def new_session_path(scope)
        new_user_session_path
    end
end
