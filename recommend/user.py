class User(object):
    def __init__(self, id, name, age):
        self.__id = id
        self.__name = name
        self.__age = age

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name