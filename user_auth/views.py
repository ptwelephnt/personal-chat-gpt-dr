######  FOR CELERY #####
# from django.shortcuts import render
# from .tasks import notify_customers

# def say_hello(request):
#     notify_customers.delay('Hello')
#     return render(request, 'hello.html', {'name': 'Mosh'})
#############################

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .models import CustomUser
from .serializers import CustomUserSerializer
from .password_validator import is_valid_password

class CreateUser(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        password = serializer.initial_data['password']
        if serializer.is_valid():
            password_valid, validation_errors = is_valid_password(password)
            if password_valid:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def login_and_get_api_key(request):
    user = request.user
    token, created = Token.objects.get_or_create(user=user)

    response_data = {
        'user_id': user.id,
        'email': user.email,
        'api_key': user.api_key,  # Include the 'api_key' in the response
        'token': token.key,
    }

    return Response(response_data, status=status.HTTP_200_OK)