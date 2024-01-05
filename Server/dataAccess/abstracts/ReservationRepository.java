package station.chargeStation.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import station.chargeStation.entities.concretes.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

}
