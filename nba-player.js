class NbaPlayer{
    constructor(fullName){
        this.fullName = fullName;
    }

    setIdAndName(id, firstName, lastName){
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }

    setBio(team, position, weight, height){
        this.setTeam(team);
        this.setPosition(position);
        this.setWeight(weight);
        this.setHeight(height);
    }

    setStats(points, assists, blocks, steals){
        this.setPoints(points);
        this.setAssits(assists);
        this.setBlocks(blocks);
        this.setSteals(steals);
    }

    setShots(freeThrowsAttempted, freeThrowsMade, fieldGoalsAttempted, fieldGoalsMade, threePointersAttempted, threePointersMade){
        this.setFreeThrowsAttempted(freeThrowsAttempted);
        this.setFreeThrowsMade(freeThrowsMade);
        
        this.setFieldGoalsAttempted(fieldGoalsAttempted);
        this.setFieldGoalsMade(fieldGoalsMade);

        this.setThreePointersAttempted(threePointersAttempted);
        this.setThreePointersMade(threePointersMade);
    }

    setFreeThrowsAttempted(freeThrowsAttempted){
        this.freeThrowsAttempted  = freeThrowsAttempted;
    }
    setFreeThrowsMade(freeThrowsMade){
        this.freeThrowsMade = freeThrowsMade;
    }
    setFieldGoalsAttempted(fieldGoalsAttempted){
        this.fieldGoalsAttempted = fieldGoalsAttempted;
    }
    setFieldGoalsMade(fieldGoalsMade){
        this.fieldGoalsMade = fieldGoalsMade;
    }
    setThreePointersAttempted(threePointersAttempted){
        this.threePointersAttempted = threePointersAttempted;
    }
    setThreePointersMade(threePointersMade){
        this.threePointersMade = threePointersMade;
    }

    setId(id){
        this.id = id;
    }
    setFirstName(firstName){
        this.firstName = firstName;
    }
    setLastName(lastName){
        this.lastName = lastName;
    }

    setYear(year){
        this.year = year;
    }

    setImage(image){
        this.image = image;
    }

    setTeam(team){
        this.team = team;
    }

    setPosition(position){
        this.position = position;
    }

    setWeight(weight){
        this.weight = weight;
    }

    setHeight(height){
        this.height = height;
    }

    setPoints(points){
        this.points = points;
    }

    setAssits(assits){
        this.assits = assits;
    }

    setBlocks(blocks){
        this.blocks = blocks;
    }

    setSteals(steals){
        this.steals = steals;
    }

    setPointsHistory(pointsHistory){
        this.pointsHistory = pointsHistory;
    }

    //GETTERS
    getId(){
        return this.id;
    }

    getFullName(){
        return this.fullName;
    }

    getFirstName(){
        return this.firstName;
    }

    getLasttName(){
        return this.lastName;
    }

    getTeam(){
        return this.team;
    }

    getPosition(){
        return this.position;
    }

    getWeight(){
        return this.weight;
    }

    getHeight(){
        return this.height;
    }

    getPoints(){
        return this.points;
    }

    getAssits(){
        return this.assits;
    }

    getBlocks(){
        return this.blocks;
    }

    getSteals(){
        return this.steals;
    }

    getImage(){
        return this.image;
    }
    getPointsHistory(){
        return this.pointsHistory;
    }

    getFreeThrowsAttempted(){
        return this.freeThrowsAttempted;
    }

    getFreeThrowsMade(){
        return this.freeThrowsMade;
    }

    getFieldGoalsAttempted(){
        return this.fieldGoalsAttempted;
    }

    getFieldGoalsMade(){
        return this.fieldGoalsMade;
    }

    getThreePointersAttempted(){
        return this.threePointersAttempted;
    }

    getThreePointersMade(){
        return this.threePointersMade;
    }
}

export default NbaPlayer;