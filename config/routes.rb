Rails.application.routes.draw do
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    devise_scope :user do
        get 'sign_in', :to => 'devise/sessions#new', :as => :new_user_session
        get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
    end

    #Api routes
    scope '/api' do
        #User API
        patch '/user', to: 'user#update'

        #Repos API
        get '/repos', to: 'repo#index'
        post '/repo/:id/stream', to: 'stream#new'
        patch '/repo/:id/stream', to: 'stream#update'
        get '/repo/:id', to: 'repo#show'
        post '/repo', to: 'repo#new'
        delete '/repo', to: 'repo#delete'

        #Stream API
        get '/repo/:id/stream/:uuid', to: 'stream#show'
        post '/repo/:id/stream', to: 'stream#new'
    end

    get '/', to: 'application#app', as: :app
    match '*path', to: 'application#app', via: :get
end