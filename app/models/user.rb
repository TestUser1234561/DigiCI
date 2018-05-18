class User < ApplicationRecord
    has_many :repos

    devise :omniauthable, omniauth_providers: %i[github]

    def build
        Jbuilder.new do |user|
            user.(self, :id, :name, :avatar)
        end
    end

    def self.from_omniauth(auth)
        where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
            user.email = auth.info.email
            user.name = auth.info.nickname
            user.avatar = auth.info.image
        end
    end

    def self.new_with_session(params, session)
        super.tap do |user|
            if (data = session["devise.github_data"] && session["devise.github_data"]["extra"]["raw_info"])
                user.email = data["email"] if user.email.blank?
            end
        end
    end
end
