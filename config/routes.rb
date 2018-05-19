Rails.application.routes.draw do
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    devise_scope :user do
        get 'sign_in', :to => 'devise/sessions#new', :as => :new_user_session
        get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
    end

    #Api routes
    scope '/api' do
        get '/repos', to: 'repo#index'
        get '/repo/:id', to: 'repo#show'
        post '/repo', to: 'repo#new'
        delete '/repo', to: 'repo#delete'
    end

    get '/', to: 'application#app', as: :app
    match '*path', to: 'application#app', via: :get
end