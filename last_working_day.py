import frappe
import re
from frappe import _
from frappe.utils import (flt, getdate, get_first_day, get_last_day, date_diff,
	add_months, add_days, formatdate, cint)

@frappe.whitelist()
def last_working_day_employee():
	dt=getdate()
	for i in frappe.db.get_list("Employee"):
		emp = frappe.get_doc("Employee", i.name)
		if emp.last_working_day==dt:
			frappe.db.set_value("Employee",emp.name, "resignation_status", "Resigned") 
			frappe.db.commit()  
			res=frappe.get_doc("Resignation", emp.Resignation_id)
			frappe.db.set_value("Resignation",res.name, "status", "Resigned") 
			frappe.db.commit()  
			jp = frappe.get_doc("Job Position", emp.profile)
			if jp.status=="Open":
				frappe.db.set_value("Job Postion",jp.name, "status", "TBH") 
				frappe.db.commit()  

