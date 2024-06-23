import { Cartesian3, Cesium3DTileset, DirectionalLight, Viewer } from 'cesium';
import { useEffect } from 'react';

export default function JapanBuildings({ viewer }: { viewer: Viewer }) {

  const loadTileset = async () => {
    try {
      const tileset = await Cesium3DTileset.fromIonAssetId(2602291);
      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(tileset);
    } catch (error) {
      console.error('Error loading tileset:', error);
    }
    const scene = viewer.scene;
    
    const cameraLight = new DirectionalLight({
      direction: scene.camera.directionWC,
    });
    scene.globe.enableLighting = true;
    scene.globe.dynamicAtmosphereLightingFromSun = false;
    scene.globe.dynamicAtmosphereLighting = false;
    scene.light = cameraLight;
    
    scene.preRender.addEventListener(function (scene) {
      scene.light.direction = Cartesian3.clone(
        scene.camera.directionWC,
        scene.light.direction
      );
    });
    
  };

  useEffect(() => {
    loadTileset();
    const scene = viewer.scene;

    const hiroshima = {
      destination: new Cartesian3(
        -3558117.165209301,
        3887175.058311886,
        3582090.381367681
      ),
      orientation: {
        direction: new Cartesian3(
          0.915045649098936,
          -0.16130516440787898,
          0.3696919041586574
        ),
        up: new Cartesian3(
          -0.20924973638933655,
          0.5937271886242537,
          0.7769829942214522
        ),
      },
    };
    
    const tokyoTower = {
      destination: new Cartesian3(
        -3959788.9678092706,
        3353283.9088315447,
        3697270.0292328526
      ),
      orientation: {
        direction: new Cartesian3(
          0.1473261076519599,
          -0.9210400676146971,
          0.3605276852787276
        ),
        up: new Cartesian3(
          -0.6082716434343354,
          0.20305763470537083,
          0.7673155835649066
        ),
      },
    };
    
    const kyotoNijoCastle = {
      destination: new Cartesian3(
        -3746418.0787567603,
        3649244.7209161296,
        3638967.47570257
      ),
      orientation: {
        direction: new Cartesian3(
          0.9417381486076588,
          -0.026110036454204615,
          0.335331963065526
        ),
        up: new Cartesian3(
          -0.2518896785254185,
          0.6059364940549604,
          0.7545810460280222
        ),
      },
    };
    
    const sapporo = {
      destination: new Cartesian3(
        -3644464.457824361,
        2916376.559037763,
        4333280.277694175
      ),
      orientation: {
        direction: new Cartesian3(
          -0.3679337542668949,
          -0.8827113216318188,
          -0.2923105799215557
        ),
        up: new Cartesian3(
          -0.7773373481004832,
          0.11948179734604299,
          0.6176331818734058
        ),
      },
    };
    
    const kaga = {
      destination: new Cartesian3(
        -3720805.8497414757,
        3554280.4145123693,
        3756470.8341226312
      ),
      orientation: {
        direction: new Cartesian3(
          -0.29857010298659575,
          0.04749330012764362,
          -0.9532052664801844
        ),
        up: new Cartesian3(
          -0.7423221317622432,
          0.6161776077834791,
          0.2632166566959398
        ),
      },
    };
    
    const hakone = {
      destination: new Cartesian3(
        -3938455.040928949,
        3417079.906560689,
        3662889.160230748
      ),
      orientation: {
        direction: new Cartesian3(
          0.09245366141098484,
          0.5115481128951291,
          -0.854266263342487
        ),
        up: new Cartesian3(
          -0.6151172847807794,
          0.703996434356258,
          0.35499260045470854
        ),
      },
    };
    
    const mtFujiGotemba = {
      destination: new Cartesian3(
        -3930814.3315207073,
        3422614.91809806,
        3665138.546010887
      ),
      orientation: {
        direction: new Cartesian3(
          0.8178889459747928,
          0.5717362258573416,
          0.06461702635254533
        ),
        up: new Cartesian3(
          -0.49123560987022913,
          0.6353948538216464,
          0.595785997932473
        ),
      },
    };
    
    const options1 = [
      {
        text: 'Hiroshima | 広島',
        onselect: function () {
          scene.camera.flyTo(hiroshima);
        },
      },
      {
        text: 'Tokyo Tower | 東京タワー',
        onselect: function () {
          scene.camera.flyTo(tokyoTower);
        },
      },
      {
        text: 'Kyoto - Nijo Castle | 京都 - 二条城',
        onselect: function () {
          scene.camera.flyTo(kyotoNijoCastle);
        },
      },
      {
        text: 'Hakone | 箱根',
        onselect: function () {
          scene.camera.flyTo(hakone);
        },
      },
      {
        text: 'Mt. Fuji - Gotemba | 富士山 - 御殿場',
        onselect: function () {
          scene.camera.flyTo(mtFujiGotemba);
        },
      },
      {
        text: 'Sapporo | 札幌',
        onselect: function () {
          scene.camera.flyTo(sapporo);
        },
      },
      {
        text: 'Kaga | 加賀',
        onselect: () => {
          scene.camera.flyTo(kaga);
        },
      },
    ];
    const toolbar = document.querySelector('div.cesium-viewer-toolbar');
    const modeButton = document.querySelector('span.cesium-sceneModePicker-wrapper');
    const myButton = document.createElement('select');

    if (toolbar) {
      options1.forEach(({ text, onselect }) => {
        const option = document.createElement('option');
        option.value = text;
        option.innerHTML = text;
        option.onclick = onselect;
        myButton.appendChild(option);
      });

      toolbar.insertBefore(myButton, modeButton);
    }

    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (e) => {
        e.cancel = true;
        scene.camera.flyTo(hiroshima);
      }
    );
  }, [viewer]);

  return null;
}
