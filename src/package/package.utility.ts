import { Platform } from "./enums";
import Npm from "@/global/assets/Npm.jpg";
import Maven from "@/global/assets/Maven.png";
import Pypi from "@/global/assets/Pypi.jpg";
import Packagist from "@/global/assets/Packagist.png";
import Rubygems from "@/global/assets/Rubygems.png";
import Crates from "@/global/assets/Crates.png";
import Nuget from "@/global/assets/Nuget.png";
import Go from "@/global/assets/Go.png";

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

  getPlatformImage = (platform: string): any => {
    switch (platform) {
      case Platform.Npm:
        return Npm;
      case Platform.Maven:
        return Maven;
      case Platform.Pypi:
        return Pypi;
      case Platform.Packagist:
        return Packagist;
      case Platform.Rubygems:
        return Rubygems;
      case Platform.Crates:
        return Crates;
      case Platform.Nuget:
        return Nuget;
      case Platform.Go:
        return Go;
      default:
        return Npm;
    }
  };
}

export default PackageUtility;
export const packageUtility = new PackageUtility();
