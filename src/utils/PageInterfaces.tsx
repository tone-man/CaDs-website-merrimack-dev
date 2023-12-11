export interface FacultyPage {
    components: {
      header: {
        facultyTitle: string;
        facultyName: string;
        departmentName: string;
        imgSource: string;
        imageAlt: string;
        nestedOrder: number;
        pageOrder: number;
        type: string;
      };
    };
    name: string; 
}
