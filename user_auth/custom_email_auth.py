from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed

class CustomEmailAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        User = get_user_model()

        # Get the 'email' and 'password' from the request data
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return None  # Return None if 'email' or 'password' is not provided

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("No such user")

        if not user.check_password(password):
            raise AuthenticationFailed("Invalid password")

        if not user.is_active:
            raise AuthenticationFailed("User is inactive")

        return (user, None)
