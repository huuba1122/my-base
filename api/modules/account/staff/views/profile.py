from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from modules.account.user.helpers.utils import UserUtils
from ..helpers.srs import StaffSr
from ..helpers.utils import StaffUtils


class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_user(self):
        return self.request.user

    def get(self, request):
        user = self.get_user()
        staff = user.staff
        data = StaffSr(staff).data
        data["permissions"] = UserUtils.get_grouped_permission(user)
        return Response(data)

    def put(self, request):
        user = self.get_user()
        staff = user.staff
        data = request.data
        if phone_number := data.get("phone_number", None):
            data = dict(phone_number=phone_number)
        staff = StaffUtils.update_staff(staff, data)
        sr = StaffSr(staff)
        return Response(sr.data)
