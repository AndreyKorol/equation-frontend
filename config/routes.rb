Rails.application.routes.draw do
  root 'home#index'

  match '*path', to: redirect('/'), via: :all
end
