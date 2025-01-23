import { Platform } from "./enums";

class PackageUtility {
  getPlaceholder = (platform: string): string => {
    switch (platform) {
      case Platform.Npm:
        return "express";
      case Platform.Maven:
        return "org.springframework.boot/spring-boot-starter";
      case Platform.Pypi:
        return "django";
      case Platform.Packagist:
        return "laravel/laravel";
      case Platform.Rubygems:
        return "rails";
      case Platform.Crates:
        return "serde";
      case Platform.Nuget:
        return "newtonsoft.json";
      case Platform.Go:
        return "github.com/gin-gonic/gin";
      default:
        return "Search packages";
    }
  };

  getTooltipMessage = (platform: string): string => {
    switch (platform) {
      case Platform.Npm:
        return `express from https://npmjs.com/package/express`;
      case Platform.Maven:
        return `org.springframework.boot/spring-boot-starter from https://search.maven.org/artifact/org.springframework.boot/spring-boot-starter`;
      case Platform.Pypi:
        return `django from https://pypi.org/project/django`;
      case Platform.Packagist:
        return `laravel/laravel from https://packagist.org/packages/laravel/laravel`;
      case Platform.Rubygems:
        return `rails from https://rubygems.org/gems/rails`;
      case Platform.Crates:
        return `serde from https://crates.io/crates/serde`;
      case Platform.Nuget:
        return `newtonsoft.json from https://www.nuget.org/packages/newtonsoft.json`;
      case Platform.Go:
        return `github.com/gin-gonic/gin from https://pkg.go.dev/github.com/gin-gonic/gin`;
      default:
        return "Search packages";
    }
  };

  getRatingColor = (rating: number): string => {
    const caseNumber = Math.floor(rating);
    switch (caseNumber) {
      case 1:
        if (caseNumber === 1) return "#E03131";
        break;
      case 2:
        if (caseNumber <= 2) return "#E8590C";
        break;
      case 3:
        if (caseNumber <= 3) return "#F08C00";
        break;
      case 4:
        if (caseNumber <= 4) return "#66A80F";
        break;
      case 5:
        if (caseNumber <= 5) return "#099268";
        break;
      default:
        return "white";
    }

    return "white";
  };

  getPlatformImageUrl = (platform: string): any => {
    switch (platform) {
      case Platform.Npm:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Npm_qzspiz.jpg";
      case Platform.Maven:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Maven_uiqiac.png";
      case Platform.Pypi:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Pypi_z0cztr.jpg";
      case Platform.Packagist:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Packagist_vbturx.png";
      case Platform.Rubygems:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Rubygems_ncqcvq.png";
      case Platform.Crates:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Crates_ktseim.png";
      case Platform.Nuget:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Nuget_jdqlwp.png";
      case Platform.Go:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Go_b3qchz.png";
      default:
        return "https://res.cloudinary.com/dgzhf1uoe/image/upload/c_thumb,w_200,g_face/v1737626292/Npm_qzspiz.jpg";
    }
  };
}

export default PackageUtility;
export const packageUtility = new PackageUtility();
