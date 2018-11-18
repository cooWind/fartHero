/**
 * 这是一个公怪物，继承自怪物基类，如果你想有其他怪物，也应该继承自怪物基类
 */
class MonsterMan extends MonBasic {

    public width = 1
    public height = 2.2
    public position = [6,3]
    public constructor(){
        super()
        this.addMonster()
    }
    private addMonster() {
        // this.movieName = 'hero'
        // this.movieScale = .5
        // this.movieArray = ['hero_1', 'hero_2', 'hero_3']
    }
}