package station.chargeStation.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import station.chargeStation.entities.concretes.ChargeStation;

public interface ChargeStationRepository extends JpaRepository<ChargeStation, Integer>{
	
}
