#include <iostream>
#include <vector>

class SafetyLogic {
public:
    // Simple logic to calculate risk based on coordinate proximity
    float calculatePathRisk(int incidentsInArea) {
        if (incidentsInArea == 0) return 0.1f; // Safe
        if (incidentsInArea < 5) return 0.4f; // Caution
        return 0.9f; // Danger
    }
};

int main() {
    SafetyLogic guard;
    std::cout << "Risk Score: " << guard.calculatePathRisk(10) << std::endl;
    return 0;
}