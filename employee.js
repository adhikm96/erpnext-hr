
frappe.ui.form.on("Employee","resign",function(frm,cdt,cdn){
  var p = frm.doc;
    var doc=frappe.model.get_new_doc("Resignation");
         doc.employee=p.name;
         doc.employee_name=p.employee_name;
        frappe.set_route("Form","Resignation",doc.name);
  });

