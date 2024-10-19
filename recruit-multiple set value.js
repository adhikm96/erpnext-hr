frappe.ui.form.on("Recruitment","after_save",function(frm,cdt,cdn){
  var p = frm.doc;
  frappe.call({
                        "method": "frappe.client.get",
                        args: {
                            doctype: "Employee",
                            filters: {
                                profile: ["=", p.job_position],
                                status: ["=", "Active"]
                            }
                        },
                        callback: function(data) {
                         console.log(data);
                                 frappe.call({
                                        "method": "frappe.client.set_value",
                                        "args": {
                                            "doctype": "Job Position",
                                            "name": p.job_position,
                                            "fieldname":{ 
                                            "current_recruitment": p.name,
                                            "current_employee":data.message.name
                                            },
                                          }
                                    }); 
                            }
                    });
});

frappe.ui.form.on("Recruitment","complete_recruitment",function(frm,cdt,cdn){
  var p = frm.doc;
      frappe.model.set_value(p.doctype, p.name, "status","Complete");
      cur_frm.save();
        frappe.call({
                                        "method": "frappe.client.set_value",
                                        "args": {
                                            "doctype": "Job Position",
                                            "name": p.job_position,
                                            "fieldname":{ 
                                            "recruitment_status":"Complete",
                                            },
                                          }
                                    }); 
        var doc=frappe.model.get_new_doc("Employee");
         doc.employee_name=p.candidate_name;
        frappe.set_route("Form","Employee",doc.name);
 });