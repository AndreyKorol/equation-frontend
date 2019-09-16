require 'rails_helper'

describe HomeController do
  describe 'GET #index' do
    it 'have http status ok' do
      get :index

      expect(response).to have_http_status :ok
    end
  end
end
