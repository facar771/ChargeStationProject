package station.chargeStation.business.concretes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import station.chargeStation.business.abstracts.ReservationService;
import station.chargeStation.dataAccess.abstracts.ReservationRepository;
import station.chargeStation.dataAccess.abstracts.UserRepository;
import station.chargeStation.entities.concretes.Reservation;

@Service
public class ReservationManager implements ReservationService{

	ReservationRepository reservationRepository;
	UserRepository userRepository;
	
	public ReservationManager(ReservationRepository reservationRepository, UserRepository userRepository) {
		this.reservationRepository = reservationRepository;
		this.userRepository = userRepository;
	}
	
	@Override
	public void add(Reservation reservation) {
		reservationRepository.save(reservation);
	}
	
	@Override
	public List<Reservation> reservastionList(int userId) {
	    List<Reservation> reservations = reservationRepository.findAll();
	    List<Reservation> userReservations = new ArrayList<>();

	    for (Reservation reservationNew : reservations) {
	        int newId = reservationNew.getUser().getId();
	        if (newId == userId) {
	            if (!userReservations.contains(reservationNew)) {
	                userReservations.add(reservationNew);
	            }
	        }
	    }
	    
	    return userReservations;
	}
	
	@Override
	public List<Reservation> stationReservastionList(int stationId) {
		List<Reservation> reservations = reservationRepository.findAll();
		List<Reservation> stationReservations = new ArrayList<>();
		
		for (Reservation reservationNew : reservations) {
	        int newId = reservationNew.getChargeStationId();
	        if (newId == stationId) {
	            if (!stationReservations.contains(reservationNew)) {
	            	stationReservations.add(reservationNew);
	            }
	        }
	    }
		return stationReservations;
	}


	@Override
	public String postStationReservation(Reservation reservation) {
		Reservation newReservation = new Reservation();
		newReservation.setChargeStationId(reservation.getChargeStationId());
		newReservation.setUser(userRepository.findById(reservation.getUser().getId()).get());
		newReservation.setReservation(reservation.getReservation());
		System.out.println(reservation);
		reservationRepository.save(newReservation);
		return "Islem Basarili";
	}

	@Override
	public String reservationDelete(int reservationId) {
		String reservationDeleteResponse = "Rezervasyon silme islemi basarisiz";
		List<Reservation> reservations = reservationRepository.findAll();
		for(Reservation reservationNew : reservations) {
			if(reservationNew.getId() == reservationId) {
				reservationRepository.deleteById(reservationId);
				reservationDeleteResponse = "Rezervasyon silme islemi basarili";
			}
		}
		return reservationDeleteResponse;
	}

	
	
	
}
