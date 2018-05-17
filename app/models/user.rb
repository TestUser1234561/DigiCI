class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
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
end
