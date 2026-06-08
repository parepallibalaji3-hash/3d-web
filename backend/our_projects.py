from firebase_init import get_db

db = get_db()

def get_ref():
    return db.reference("projects")

def add_project(data):
    try:
        ref = get_ref()
        new_project_ref = ref.push(data)
        return {"success": True, "id": new_project_ref.key}
    except Exception as e:
        return {"success": False, "message": str(e)}

def get_all_projects():
    try:
        ref = get_ref()
        data = ref.get()
        if not data:
            return []
        projects = []
        for key, val in data.items():
            val["id"] = key
            projects.append(val)
        return projects
    except Exception as e:
        return []

def get_project_by_id(project_id):
    try:
        ref = get_ref().child(project_id)
        data = ref.get()
        if data:
            data["id"] = project_id
            return data
        return None
    except Exception as e:
        return None

def update_project(project_id, data):
    try:
        ref = get_ref().child(project_id)
        ref.update(data)
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}

def delete_project(project_id):
    try:
        ref = get_ref().child(project_id)
        ref.delete()
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
