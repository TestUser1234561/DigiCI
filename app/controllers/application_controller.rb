class ApplicationController < ActionController::Base
    def app
        @user = current_user.build.target!
        render :index
    end
end
