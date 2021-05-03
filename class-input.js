const ClassModel = require("app");

class ClassInput {
    static async getAll() {
        return ClassModel.find({}).sort({ createdAt: -1 }).exec();
    }

    static async getOne(itemId) {
        return ClassModel.findById(classId).exec();
    }

    static async create(data) {
        const course = new ClassModel(data);
        return course.save();
    }

    static async update(itemId, data) {
        return ClassModel.findByIdAndUpdate(classId, data).exec();
    }

    static async remove(itemId) {
        return ClassModel.deleteOne({ _id: classId }).exec();
    }
}

module.exports = ClassInput;
