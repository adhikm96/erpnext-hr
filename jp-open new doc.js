frappe.ui.form.on("Job Position","start__recruiment",function(frm,cdt,cdn){
	var p = frm.doc;
	var doc=frappe.model.get_new_doc("Recruitment");
	doc.job_position=p.name;
	frappe.set_route("Form","Recruitment",doc.name);
});

