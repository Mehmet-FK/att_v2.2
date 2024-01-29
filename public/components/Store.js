export const dummyModules = [
  {
    groupTitle: "Schädlingsbekämpfung",
    bgColor: "#e63e10",
    img: "https://einfaches-gaertnern.de/wp-content/uploads/2021/02/header-biologische-schaedlingsbekaempfung-1.jpg",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
      },
      {
        name: "Mobiler Leistungsschein",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#F9E7C0",
      },
      {
        name: "SB Kontrolle",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#41B27C",
      },
    ],
  },
  {
    groupTitle: "Grünflächenbetreuung",
    bgColor: "#32a89e",
    img: "https://www.forestryengland.uk/sites/default/files/media/2024121.jpg",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
      },
      {
        name: "Mobiler Leistungsschein",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#F9E7C0",
      },
      {
        name: "Vermessung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#50A0FF",
      },
      {
        name: "Kontrollgänge",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#779EBB",
      },
      {
        name: "GF Erfassung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#698A4F",
      },
    ],
  },
  {
    groupTitle: "Winterservice",
    bgColor: "#1ad2eb",
    img: "https://image.gala.de/22214152/t/VI/v5/w2048/r1.5/-/winter.jpg",
    subModules: [
      {
        name: "Container Verwaltung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#37E0D6",
      },
      {
        name: "GB Zeiterfassung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#27B82D",
      },
      {
        name: "Vermessung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#50A0FF",
      },
    ],
  },
  {
    groupTitle: "Hausbetreuung",
    bgColor: "#d1a24f",
    img: "https://www.gsteurer.at/uploads/HrXHEHkg/767x0_2560x0/Hausbetreuung3.jpg",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
      },
      {
        name: "Zahlscheine / Aushänge",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#6FE0F9",
      },
      {
        name: "Kontrollgänge",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#779EBB",
      },
      {
        name: "Kostenlose Leistungen",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#30DAE4",
      },
    ],
  },
  {
    groupTitle: "Sonderreinigung",
    bgColor: "#4fd197",
    img: "https://jaeger-hausbetreuung.at/wp-content/uploads/2021/10/sonderreinigung.webp",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
      },
      {
        name: "Mobiler Leistungsschein",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#F9E7C0",
      },
      {
        name: "Vermessung",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#50A0FF",
      },
      {
        name: "Kontrollgänge",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#779EBB",
      },
    ],
  },
  {
    groupTitle: "Haustechnik & Wartung",
    bgColor: "#2b00ff",
    img: "https://cdn3.vectorstock.com/i/1000x1000/40/47/office-folders-on-shelves-pattern-business-hard-vector-44364047.jpg",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
      },
      {
        name: "Mobiler Leistungsschein",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#F9E7C0",
      },
      {
        name: "Bereitschaftsmappe",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#EAC083",
      },
    ],
  },
];

export class Store {
  static data;

  static setData(data) {
    this.data = data;
  }
  static getData() {
    return this.data;
  }
}
