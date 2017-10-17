import * as firebase from 'firebase';

class HousesCtrl {
    constructor($scope, housesSvc) {
        'ngInject'
        this.$scope = $scope;
        this.housesSvc = housesSvc;

        this.firebaseRef = firebase.database().ref('houses/');
        this.firebaseRef.on('value', (snapshot)=> {
            this.houses = snapshot.val();
            $scope.$applyAsync();
        });
    }

    createNewHouse(name, bedrooms) {
        this.housesSvc.createHouse(name, bedrooms).then(()=>{
            this.houseName = "";
            this.bedrooms = "";
            this.$scope.$applyAsync();
        })
    }

    deleteHouse(houseID) {
        this.housesSvc.deleteHouse(houseID).then(()=> {
            console.log('Deleted')
        })
    }

    toggleEditHouse(houseID, house) {
        console.log('House<<<', house);
        this.editing = houseID;
        this.newHouseName = house.name;
        this.newBedRoomsNumber = house.bedrooms;
        this.$scope.$applyAsync();
    }

    updateHouse(event, houseID) {
        if(event.which === 13) {
            if(this.newHouseName && this.newBedRoomsNumber) {
                this.housesSvc.updateHouse(houseID, this.newHouseName, this.newBedRoomsNumber).then(()=> {
                    this.editing = false;
                    this.$scope.$applyAsync();
                })
            } else {
                console.log('Name and number of bedrooms required');
            }
        }
    }
}

export default HousesCtrl;
