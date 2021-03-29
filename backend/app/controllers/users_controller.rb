class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :login]

  def profile
    render json: @user
  end

  def create
    @user = User.create(username: params[:username], password: params[:password])

    render json: @user
  end

  def login
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      payload = {user_id: @user.id}
      @token = JWT.encode(payload, 'secret')

      render json: {user: @user, token: @token}
    else
      render json: {error: "Invalid Credentials"}, status: :unauthorized
    end
  end
end
