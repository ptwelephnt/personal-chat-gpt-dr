from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

def is_valid_password(password):
    try:
        password_valid = validate_password(password)
        if password_valid == None:
            return True, None
    except ValidationError as e:
        return False, e.messages