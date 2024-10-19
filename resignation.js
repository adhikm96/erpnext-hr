frappe.ui.form.on("Resignation","before_save",function(frm,cdt,cdn){
  var p = frm.doc;
  var lwd,np;
  frappe.model.set_value(p.doctype, p.name, "status","Serving Notice");
   frappe.call({
                        "method": "frappe.client.get",
                        args: {
                            doctype: "Employee",
                            filters: {
                                name: ["=", p.employee],
                            }
                        },
                         async: false,
                        callback: function(data) {
                        	console.log(data)
                        	if (data.message.notice_period>0){
								 lwd=frappe.datetime.add_days(frappe.datetime.get_today(), data.message.notice_period)
								 np=data.message.notice_period;
							}
							else{
								 lwd=frappe.datetime.add_days(frappe.datetime.get_today(), 30)
								 np=30;
								}
      							frappe.call({
                                        "method": "frappe.client.set_value",
                                        "args": {
                                            "doctype": "Employee",
                                            "name": p.employee,
                                            "fieldname":{ 
                                            "date_of_resignation":frappe.datetime.get_today(),
                                            "status":"Serving Notice",
                                            "notice_period":np,
                                            "last_working_day":lwd
                                            },
                                          }
                                    }); 
      							console.log(data.message.profile);
      							frappe.call({
                                        "method": "frappe.client.set_value",
                                        "args": {
                                            "doctype": "Job Position",
                                            "name": data.message.profile,
                                            "fieldname":{ 
                                            "recruitment_status":"Open"
                                            },
                                          }
                                    }); 
      						}
      			 });
     });