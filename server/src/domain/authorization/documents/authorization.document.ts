export class AuthorizationDoc {
  _userId: string;
  name: string;
  email: string;
  centers: CenterDoc[];
}

export class CenterDoc {
  _centerId: string;
  name: string;
  permissions: Permission[];
  projects: Project[];
}

export class Permission {
  _projectId: string;
  name: string;
  code: string;
}

export class Project {
  _projectId: string;
  name: string;
  roles: Role[];
}

export class Role {
  _roleId: string;
  name: string;
  code: string;
}
