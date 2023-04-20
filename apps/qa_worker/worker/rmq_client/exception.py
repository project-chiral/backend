class RmqException(Exception):
    code: int
    message: str
