from modules.account.staff.helpers.srs import StaffSr
from modules.account.user.helpers.utils import UserUtils


class StaffUtils:
    
    @staticmethod
    def create_staff(data):
        user = UserUtils.create_user(data)

        # Create staff
        staff_data = data | {"user": user.pk}
        sr = StaffSr(data=staff_data)
        sr.is_valid(raise_exception=True)
        return sr.save()

    @staticmethod
    def update_staff(staff, data):
        user = UserUtils.update_user(staff.user, data)

        # Update staff
        staff_data = data | {"user": user.pk}
        sr = StaffSr(staff, data=staff_data, partial=True)
        sr.is_valid(raise_exception=True)
        return sr.save()
