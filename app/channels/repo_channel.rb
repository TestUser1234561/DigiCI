class RepoChannel < ApplicationCable::Channel
    def subscribed
        stream_from "Repo_#{params[:repo]}"
    end

    def receive(data)
        ActionCable.server.broadcast "Repo_#{params[:repo]}", data
    end
end